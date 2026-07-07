import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import SquareModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import Image, ImageDraw, ImageOps
import os

def create_geeks_style_qr(url, logo_path, output_path):
    # Setup QR code with high error correction
    qr = qrcode.QRCode(
        version=5,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=15,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Infernos Default Brand Color (Requested Black)
    BRAND_COLOR = (0, 0, 0) # Black

    # Generate the base styled QR code (Classic Squares)
    qr_img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=SquareModuleDrawer(),
        eye_drawer=SquareModuleDrawer(),
        color_mask=SolidFillColorMask(back_color=(255, 255, 255), front_color=(0,0,0))
    ).convert('RGBA')

    # Invert the QR code to get white bars on black background
    qr_img = ImageOps.invert(qr_img.convert('RGB')).convert('RGBA')

    if not os.path.exists(logo_path):
        print(f"Error: Could not find logo at {logo_path}")
        qr_img.convert('RGB').save(output_path)
        return

    # Open the logo
    logo = Image.open(logo_path).convert("RGBA")

    # Calculate logo size
    logo_max_size = int(qr_img.size[0] / 3.5)
    wpercent = (logo_max_size / float(logo.size[0]))
    hsize = int((float(logo.size[1]) * float(wpercent)))
    logo = logo.resize((logo_max_size, hsize), Image.Resampling.LANCZOS)
    
    # Crop the logo into a perfect circle (like the GeeksForGeeks one)
    # This ensures even a square JPEG logo looks clean and circular in the middle
    mask = Image.new('L', logo.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, logo.size[0], logo.size[1]), fill=255)
    
    circular_logo = Image.new('RGBA', logo.size, (0, 0, 0, 0))
    circular_logo.paste(logo, (0, 0), mask=mask)

    # Calculate center position
    pos = (
        (qr_img.size[0] - circular_logo.size[0]) // 2,
        (qr_img.size[1] - circular_logo.size[1]) // 2
    )

    # Paste the circular logo directly onto the QR code (no white background pad)
    qr_img.paste(circular_logo, pos, mask=circular_logo)

    # Save
    qr_img.convert('RGB').save(output_path)
    print(f"Success! GeeksForGeeks style QR code saved to: {output_path}")

if __name__ == "__main__":
    URL = "https://infernos.co.in"
    
    # Using your actual Navbar logo
    LOGO_PATH = "public/infernos.jpeg"
    OUTPUT_PATH = "public/infernos_qr.png"
    
    print(f"Generating QR code for {URL}...")
    create_geeks_style_qr(URL, LOGO_PATH, OUTPUT_PATH)
