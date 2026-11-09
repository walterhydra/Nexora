import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../core/constants/app_constants.dart';
import '../core/theme/colors.dart';
import 'no_internet_screen.dart';
import 'error_screen.dart';

class WebViewScreen extends StatefulWidget {
  const WebViewScreen({super.key});

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  final GlobalKey webViewKey = GlobalKey();

  InAppWebViewController? webViewController;
  InAppWebViewSettings settings = InAppWebViewSettings(
    isInspectable: true,
    mediaPlaybackRequiresUserGesture: false,
    allowsInlineMediaPlayback: true,
    iframeAllow: "camera; microphone; playing; fullscreen",
    iframeAllowFullscreen: true,
    transparentBackground: true,
    userAgent: AppConstants.userAgent,
    supportZoom: false, // Disable pinch-zoom
    useShouldOverrideUrlLoading: true, // Crucial for intercepting external links
    useOnDownloadStart: true, // Crucial for intercepting downloads
    incognito: false, // Ensure cookies/session persist
  );

  PullToRefreshController? pullToRefreshController;
  
  bool hasInternet = true;
  bool isLoading = true;
  String errorMessage = '';

  @override
  void initState() {
    super.initState();
    _checkInternetConnection();

    // Remove splash screen immediately to show Flutter loading indicator
    FlutterNativeSplash.remove();

    pullToRefreshController = PullToRefreshController(
      settings: PullToRefreshSettings(
        color: AppColors.primaryCyan,
        backgroundColor: AppColors.backgroundDark,
      ),
      onRefresh: () async {
        if (Platform.isAndroid) {
          webViewController?.reload();
        } else if (Platform.isIOS) {
          webViewController?.loadUrl(
              urlRequest: URLRequest(url: await webViewController?.getUrl()));
        }
      },
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Precache the logo image for a smooth transition
    precacheImage(const AssetImage('assets/images/Main.png'), context);
    precacheImage(const AssetImage('assets/images/nexoraa_logo_exact_center.png'), context);
  }

  Future<void> _checkInternetConnection() async {
    final connectivityResult = await (Connectivity().checkConnectivity());
    setState(() {
      hasInternet = !connectivityResult.contains(ConnectivityResult.none);
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!hasInternet) {
      return NoInternetScreen(
        onRetry: () {
          setState(() {
            isLoading = true;
            errorMessage = '';
          });
          _checkInternetConnection().then((_) {
            if (hasInternet) {
              webViewController?.reload();
            }
          });
        },
      );
    }

    if (errorMessage.isNotEmpty) {
      return ErrorScreen(
        errorMessage: errorMessage,
        onRetry: () {
          setState(() {
            isLoading = true;
            errorMessage = '';
          });
          _checkInternetConnection().then((_) {
            if (hasInternet) {
              webViewController?.reload();
            }
          });
        },
      );
    }

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;

        if (webViewController != null) {
          if (await webViewController!.canGoBack()) {
            webViewController!.goBack();
            return;
          }
        }
        
        // Show exit confirmation dialog
        final shouldExit = await showDialog<bool>(
          context: context,
          builder: (context) => AlertDialog(
            backgroundColor: AppColors.backgroundDark,
            title: const Text('Exit App?', style: TextStyle(color: Colors.white)),
            content: const Text('Are you sure you want to exit?', style: TextStyle(color: Colors.white70)),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(false),
                child: const Text('No', style: TextStyle(color: AppColors.primaryCyan)),
              ),
              TextButton(
                onPressed: () => Navigator.of(context).pop(true),
                child: const Text('Yes', style: TextStyle(color: AppColors.primaryCyan)),
              ),
            ],
          ),
        );

        if (shouldExit == true && context.mounted) {
          exit(0); // Actually exit the app
        }
      },
      child: Scaffold(
        backgroundColor: AppColors.backgroundDark,
        body: SafeArea(
          child: Stack(
            children: [
              InAppWebView(
                key: webViewKey,
                initialUrlRequest: URLRequest(url: WebUri(AppConstants.homeUrl)),
                initialSettings: settings,
                pullToRefreshController: pullToRefreshController,
                onWebViewCreated: (controller) {
                  webViewController = controller;
                },
                onLoadStart: (controller, url) {
                  setState(() {
                    isLoading = true;
                    errorMessage = '';
                  });
                },
                onLoadStop: (controller, url) async {
                  pullToRefreshController?.endRefreshing();
                  setState(() {
                    isLoading = false;
                    errorMessage = ''; // Clear error on success
                  });
                },
                onReceivedError: (controller, request, error) {
                  pullToRefreshController?.endRefreshing();
                  
                  // Ignore minor or transient errors
                  if (error.type == WebResourceErrorType.UNKNOWN || 
                      error.description.contains('ERR_CACHE_MISS') ||
                      error.description.contains('ERR_CONNECTION_RESET') ||
                      error.description.contains('ERR_NAME_NOT_RESOLVED')) {
                    return;
                  }
                  
                  // Only show error screen for main frame failures
                  if (request.isForMainFrame ?? true) {
                    setState(() {
                      isLoading = false;
                      errorMessage = 'Failed to load page. Please check your internet and try again.';
                    });
                  }
                },
                onProgressChanged: (controller, progress) {
                  if (progress == 100) {
                    pullToRefreshController?.endRefreshing();
                  }
                },
                shouldOverrideUrlLoading: (controller, navigationAction) async {
                  var uri = navigationAction.request.url!;

                  // 1. Handle non-http/s schemes (tel:, mailto:, whatsapp:, etc.)
                  if (!["http", "https", "file", "chrome", "data", "javascript", "about"].contains(uri.scheme)) {
                    if (await canLaunchUrl(uri)) {
                      await launchUrl(uri, mode: LaunchMode.externalApplication);
                      return NavigationActionPolicy.CANCEL;
                    }
                  }

                  // 2. Allow internal website and its subdomains to load INSIDE the app
                  String homeHost = WebUri(AppConstants.homeUrl).host;
                  // Remove 'www.' from homeHost if present to match subdomains correctly
                  String baseHost = homeHost.startsWith('www.') ? homeHost.substring(4) : homeHost;
                  
                  if (uri.host == homeHost || uri.host == baseHost || uri.host.endsWith('.$baseHost')) {
                      return NavigationActionPolicy.ALLOW;
                  }

                  // 3. Open OTHER external websites in the default system browser
                  if (uri.host.isNotEmpty) {
                      if (await canLaunchUrl(uri)) {
                          await launchUrl(uri, mode: LaunchMode.externalApplication);
                          return NavigationActionPolicy.CANCEL;
                      }
                  }

                  return NavigationActionPolicy.ALLOW;
                },
                onDownloadStartRequest: (controller, downloadStartRequest) async {
                  // Delegate download to the external system browser to handle it natively
                  final uri = downloadStartRequest.url;
                  if (await canLaunchUrl(uri)) {
                    await launchUrl(uri, mode: LaunchMode.externalApplication);
                  }
                },
                onJsAlert: (controller, jsAlertRequest) async {
                  await showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                      backgroundColor: AppColors.backgroundDark,
                      content: Text(jsAlertRequest.message ?? '', style: const TextStyle(color: Colors.white)),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.of(context).pop(),
                          child: const Text('OK', style: TextStyle(color: AppColors.primaryCyan)),
                        ),
                      ],
                    ),
                  );
                  return JsAlertResponse(handledByClient: true);
                },
                onJsConfirm: (controller, jsConfirmRequest) async {
                  final result = await showDialog<bool>(
                    context: context,
                    builder: (context) => AlertDialog(
                      backgroundColor: AppColors.backgroundDark,
                      content: Text(jsConfirmRequest.message ?? '', style: const TextStyle(color: Colors.white)),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.of(context).pop(false),
                          child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
                        ),
                        TextButton(
                          onPressed: () => Navigator.of(context).pop(true),
                          child: const Text('OK', style: TextStyle(color: AppColors.primaryCyan)),
                        ),
                      ],
                    ),
                  );
                  return JsConfirmResponse(handledByClient: true, action: result == true ? JsConfirmResponseAction.CONFIRM : JsConfirmResponseAction.CANCEL);
                },
                onJsPrompt: (controller, jsPromptRequest) async {
                  String value = jsPromptRequest.defaultValue ?? '';
                  final result = await showDialog<String>(
                    context: context,
                    builder: (context) => AlertDialog(
                      backgroundColor: AppColors.backgroundDark,
                      content: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(jsPromptRequest.message ?? '', style: const TextStyle(color: Colors.white)),
                          const SizedBox(height: 16),
                          TextField(
                            style: const TextStyle(color: Colors.white),
                            decoration: const InputDecoration(
                              enabledBorder: UnderlineInputBorder(borderSide: BorderSide(color: AppColors.primaryCyan)),
                              focusedBorder: UnderlineInputBorder(borderSide: BorderSide(color: AppColors.primaryCyan)),
                            ),
                            onChanged: (val) => value = val,
                            controller: TextEditingController(text: value),
                          ),
                        ],
                      ),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.of(context).pop(null),
                          child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
                        ),
                        TextButton(
                          onPressed: () => Navigator.of(context).pop(value),
                          child: const Text('OK', style: TextStyle(color: AppColors.primaryCyan)),
                        ),
                      ],
                    ),
                  );
                  return JsPromptResponse(
                    handledByClient: true,
                    action: result != null ? JsPromptResponseAction.CONFIRM : JsPromptResponseAction.CANCEL,
                    value: result,
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
