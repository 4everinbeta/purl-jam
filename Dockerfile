FROM nopcommerceteam/nopcommerce:latest

# Bake in the custom theme so Railway can build a self-contained image.
COPY deploy/docker/themes/PurlJam /app/Themes/PurlJam
