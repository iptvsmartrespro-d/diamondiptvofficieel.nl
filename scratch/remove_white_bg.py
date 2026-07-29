import os
from PIL import Image

def remove_white_and_black_bg(image_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        # Calculate perceived brightness
        brightness = 0.299 * r + 0.587 * g + 0.114 * b

        # Remove white / light grey background pixels (brightness > 210 or r,g,b > 210)
        if brightness >= 230 or (r > 220 and g > 220 and b > 220):
            new_data.append((r, g, b, 0))
        elif brightness > 190:
            # Feather light edge alpha transition
            alpha_factor = (230 - brightness) / (230 - 190)
            new_alpha = int(a * alpha_factor)
            new_data.append((r, g, b, new_alpha))
        # Remove solid black background pixels (brightness < 20)
        elif brightness <= 20:
            new_data.append((r, g, b, 0))
        elif brightness < 50:
            alpha_factor = (brightness - 20) / (50 - 20)
            new_alpha = int(a * alpha_factor)
            new_data.append((r, g, b, new_alpha))
        else:
            new_data.append((r, g, b, a))

    img.putdata(new_data)
    img.save(image_path, "PNG")
    print(f"White & Black background removed successfully for: {image_path}")

if __name__ == "__main__":
    base_dir = r"c:\Users\Awais Ahmed\OneDrive\Documents\GitHub\Diamond IPTV\images"
    remove_white_and_black_bg(os.path.join(base_dir, "hero-devices.png"))
    remove_white_and_black_bg(os.path.join(base_dir, "kopen-hero-devices.png"))
    remove_white_and_black_bg(os.path.join(base_dir, "install-hero-devices.png"))
