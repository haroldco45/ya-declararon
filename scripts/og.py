# Crea og-image.jpg (1200x630) con foto real del Capitolio para la vista previa del enlace.
from PIL import Image, ImageDraw, ImageFont, ImageOps
F = '/usr/share/fonts/truetype/dejavu/'
im = ImageOps.fit(Image.open('media/capitolio-1.jpg').convert('RGB'), (1200, 630))
shade = Image.new('L', (1200, 630))
d = ImageDraw.Draw(shade)
for y in range(630):
    d.line([(0, y), (1200, y)], fill=int(40 + 205 * (y / 630) ** 1.4))
im = Image.composite(Image.new('RGB', (1200, 630), (11, 26, 51)), im, shade)
d = ImageDraw.Draw(im)
d.text((60, 330), '¿Ya declararon?', font=ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', 80), fill=(255, 178, 30))
d.text((62, 440), 'Exija la lista de representantes que publicaron su renta', font=ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', 33), fill='white')
d.text((62, 500), 'Derecho de petición ciudadano · ya-declararon.netlify.app', font=ImageFont.truetype(F + 'DejaVuSans.ttf', 27), fill=(220, 225, 235))
d.text((62, 550), 'Vibras Positivas HM', font=ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', 24), fill=(255, 122, 26))
im.save('og-image.jpg', quality=86)
print('og-image.jpg listo')
