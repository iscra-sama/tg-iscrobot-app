#! /bin/bash
source .env
# @debug(printf '%s' "$DOMAIN" | od -c)
while true; do
  curl "${DOMAIN%$'\r'}" > /dev/null
  echo "Fetched at $(date +'%Y-%m-%dT%H:%M:%S.%N')"
  sleep 512
done