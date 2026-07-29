import os
from PIL import Image, ImageFilter

def make_background_transparent(input_path, output_path, threshold_low=20, threshold_high=55):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        # Calculate perceived brightness
        brightness = 0.299 * r + 0.587 * g + 0.114 * b

        if brightness <= threshold_low:
            # Fully transparent
            new_data.append((r, g, b, 0))
        elif brightness >= threshold_high:
            # Fully opaque
            new_data.append((r, g, b, a))
        else:
            # Smooth linear alpha transition
            alpha_factor = (brightness - threshold_low) / (threshold_high - threshold_low)
            new_alpha = int(a * alpha_factor)
            new_data.append((r, g, b, new_alpha))

    img.putdata(new_data)
    
    # Save optimized transparent PNG
    img.save(output_path, "PNG")
    print(f"Successfully processed {input_path} -> {output_path}")

if __name__ == "__main__":
    base_dir = r"c:\Users\Awais Ahmed\OneDrive\Documents\GitHub\Diamond IPTV\images"
    
    make_background_transparent(os.path.join(base_dir, "hero-devices.png"), os.path.join(base_dir, "hero-devices.png"), 25, 60)
    make_background_transparent(os.path.join(base_dir, "kopen-hero-devices.png"), os.path.join(base_dir, "kopen-hero-devices.png"), 25, 60)
    make_background_transparent(os.path.join(base_dir, "install-hero-devices.png"), os.path.join(base_dir, "install-hero-devices.png"), 25, 60)
