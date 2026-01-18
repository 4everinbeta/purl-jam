
import os
import django
from django.core.files import File
from django.conf import settings

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "purljam.settings")
django.setup()

from oscar.core.loading import get_class, get_model

Product = get_model('catalogue', 'Product')
ProductClass = get_model('catalogue', 'ProductClass')
ProductCategory = get_model('catalogue', 'ProductCategory')
Category = get_model('catalogue', 'Category')
ProductImage = get_model('catalogue', 'ProductImage')
Partner = get_model('partner', 'Partner')
StockRecord = get_model('partner', 'StockRecord')

import urllib.request

# Define the products from app.js
products_data = [
  {
    "id": "pj-001",
    "name": "Riverstone Merino",
    "price": 28.00,
    "color": "sage",
    "fiber": "wool",
    "description": "Cloud-soft merino with gentle stretch for everyday knits.",
    "image_path": "static/references/products/products_1_yarn_skein_product_photography.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-002",
    "name": "Sunlit Linen Blend",
    "price": 24.00,
    "color": "cream",
    "fiber": "cotton",
    "description": "Breathable linen-cotton blend with a relaxed drape.",
    "image_path": "static/references/products/products_12_minimal_yarn_product_photo.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1605256585681-455837661b18?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-003",
    "name": "Alpine Alpaca",
    "price": 32.00,
    "color": "neutrals",
    "fiber": "wool",
    "description": "Warm alpaca with a soft halo for cozy winter layers.",
    "image_path": "static/references/products/products_8_yarn_skein_product_photography.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1596464716127-f9a82b24508e?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-004",
    "name": "Willow DK",
    "price": 22.00,
    "color": "sage",
    "fiber": "wool",
    "description": "Balanced DK weight with a calm sage hue.",
    "image_path": "static/references/products/products_2_yarn_skein_product_photography.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1628151016150-ccbc7b53945d?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-005",
    "name": "Harbor Tweed",
    "price": 30.00,
    "color": "neutrals",
    "fiber": "wool",
    "description": "Textured tweed blend for structured knits.",
    "image_path": "static/references/products/products_3_yarn_skein_product_photography.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1519098901909-b1553a1190af?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-006",
    "name": "Cloud Loft",
    "price": 34.00,
    "color": "cream",
    "fiber": "wool",
    "description": "Airy alpaca blend with a soft, cloudlike bloom.",
    "image_path": "static/references/products/products_4_yarn_skein_product_photography.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1579271617300-474c35e61033?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-007",
    "name": "Drift Sock",
    "price": 20.00,
    "color": "neutrals",
    "fiber": "acrylic",
    "description": "Durable sock yarn with subtle speckles.",
    "image_path": "static/references/products/products_5_yarn_skein_product_photography.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1628151016005-3925c49dc03c?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-008",
    "name": "Meadow Cotton",
    "price": 18.00,
    "color": "cream",
    "fiber": "cotton",
    "description": "Soft cotton for tees, tanks, and baby knits.",
    "image_path": "static/references/products/products_6_yarn_skein_product_photography.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1605256585681-455837661b18?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-009",
    "name": "Mist Mohair",
    "price": 26.00,
    "color": "sage",
    "fiber": "wool",
    "description": "Featherlight mohair laceweight for layered texture.",
    "image_path": "static/references/products/products_7_yarn_skein_product_photography.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?w=800",
    "product_class": "Yarn"
  },
  {
    "id": "pj-010",
    "name": "Studio Notions Kit",
    "price": 20.00,
    "color": "neutrals",
    "fiber": "acrylic",
    "description": "Stitch markers and organizers for tidy projects.",
    "image_path": "static/references/textures/textures_3_yarn_texture_close_up.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1601666680652-520e181c19b3?w=800",
    "product_class": "Tools"
  },
  {
    "id": "pj-011",
    "name": "Maple Needles",
    "price": 26.00,
    "color": "cream",
    "fiber": "wool",
    "description": "Warm-touch needles with balanced control.",
    "image_path": "static/references/lifestyle/lifestyle_4_knitting_hands_natural_light.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1584698505500-a61361c77507?w=800",
    "product_class": "Tools"
  },
  {
    "id": "pj-012",
    "name": "Minimalist Hooks",
    "price": 18.00,
    "color": "sage",
    "fiber": "acrylic",
    "description": "Lightweight hooks with a smooth glide.",
    "image_path": "static/references/lifestyle/lifestyle_11_crochet_hands_neutral_tones.jpg",
    "unsplash_url": "https://images.unsplash.com/photo-1618375682224-b6338b25979f?w=800",
    "product_class": "Tools"
  },
]

def populate():
    # Ensure partner exists
    partner, _ = Partner.objects.get_or_create(name='Purl Jam')

    for p_data in products_data:
        print(f"Processing {p_data['name']}...")
        
        # Get or create Product Class
        product_class, _ = ProductClass.objects.get_or_create(
            name=p_data['product_class'],
            defaults={'slug': p_data['product_class'].lower()}
        )

        # Check if product exists
        try:
            product = Product.objects.get(upc=p_data['id'])
            print(f"  - Product already exists: {product}")
        except Product.DoesNotExist:
            product = Product(
                upc=p_data['id'],
                title=p_data['name'],
                description=p_data['description'],
                product_class=product_class
            )
            product.save()
            print(f"  - Created product: {product}")

            # Create StockRecord
            StockRecord.objects.create(
                product=product,
                partner=partner,
                partner_sku=p_data['id'],
                price_currency='USD',
                price=p_data['price'],
                num_in_stock=100
            )
            print(f"  - Created stock record")

        # Handle Image (Check if exists on disk, restore if missing)
        image_needs_restore = False
        if product.primary_image:
             if not os.path.exists(product.primary_image.original.path):
                 print(f"  - Image record exists but file is missing: {product.primary_image.original.path}")
                 image_needs_restore = True
                 product.primary_image.delete() 
        else:
             image_needs_restore = True

        if image_needs_restore:
            if os.path.exists(p_data['image_path']):
                with open(p_data['image_path'], 'rb') as f:
                    im = ProductImage(product=product)
                    im.original.save(os.path.basename(p_data['image_path']), File(f), save=True)
                    print(f"  - Restored/Added image from local")
            elif p_data.get('unsplash_url'):
                print(f"  - Downloading image from {p_data['unsplash_url']}...")
                try:
                    # Download to temp file
                    temp_path, _ = urllib.request.urlretrieve(p_data['unsplash_url'])
                    with open(temp_path, 'rb') as f:
                        im = ProductImage(product=product)
                        im.original.save(f"{p_data['id']}.jpg", File(f), save=True)
                        print(f"  - Restored/Added image from Unsplash")
                    os.remove(temp_path)
                except Exception as e:
                    print(f"  - ERROR downloading from Unsplash: {e}")
            else:
                print(f"  - WARNING: Image not found at {p_data['image_path']} and no Unsplash URL")

if __name__ == "__main__":
    populate()
