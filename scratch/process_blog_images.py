import os
from PIL import Image

def process_image(src_path, dest_path):
    img = Image.open(src_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        brightness = 0.299 * r + 0.587 * g + 0.114 * b

        # Remove white / light background pixels
        if brightness >= 230 or (r > 220 and g > 220 and b > 220):
            new_data.append((r, g, b, 0))
        elif brightness > 190:
            alpha_factor = (230 - brightness) / (230 - 190)
            new_alpha = int(a * alpha_factor)
            new_data.append((r, g, b, new_alpha))
        # Remove solid black background pixels
        elif brightness <= 20:
            new_data.append((r, g, b, 0))
        elif brightness < 50:
            alpha_factor = (brightness - 20) / (50 - 20)
            new_alpha = int(a * alpha_factor)
            new_data.append((r, g, b, new_alpha))
        else:
            new_data.append((r, g, b, a))

    img.putdata(new_data)
    img.save(dest_path, "PNG")
    print(f"Processed: {src_path} -> {dest_path}")

if __name__ == "__main__":
    img1 = r"C:\Users\Awais Ahmed\.gemini\antigravity\brain\57b5be9b-314f-4010-afb1-f289d5733669\blog_wat_is_iptv_1785439705470.png"
    img2 = r"C:\Users\Awais Ahmed\.gemini\antigravity\brain\57b5be9b-314f-4010-afb1-f289d5733669\blog_hoe_werkt_iptv_1785439729022.png"

    target_dir = r"c:\Users\Awais Ahmed\OneDrive\Documents\GitHub\Diamond IPTV\images"

    process_image(img1, os.path.join(target_dir, "blog-wat-is-iptv.png"))
    process_image(img2, os.path.join(target_dir, "blog-hoe-werkt-iptv.png"))
