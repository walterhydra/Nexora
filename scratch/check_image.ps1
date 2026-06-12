Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap((Join-Path (Get-Location) 'public/team/milan.png'))
$width = $bmp.Width
$height = $bmp.Height

$minX = $width
$maxX = 0
$minY = $height
$maxY = 0

# Scan pixels on a grid to find active content bounds
for ($y = 0; $y -lt $height; $y += 5) {
    for ($x = 0; $x -lt $width; $x += 5) {
        $p = $bmp.GetPixel($x, $y)
        # Check if alpha is not fully transparent, and color is not solid black
        if ($p.A -gt 10 -and ($p.R -gt 5 -or $p.G -gt 5 -or $p.B -gt 5)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$bmp.Dispose()

Write-Output "Dimensions: $width x $height"
Write-Output "MinX: $minX, MaxX: $maxX"
Write-Output "MinY: $minY, MaxY: $maxY"
