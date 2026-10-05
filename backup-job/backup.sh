#!/bin/bash
set -euo pipefail
TS=$(date -u +%Y%m%dT%H%M%SZ)
DOW=$(date -u +%u)
FILE="/tmp/todo-${TS}.archive.gz"
echo "Starting backup ${TS}"
mongodump --uri="${MONGODB_URI}" --archive="${FILE}" --gzip
SIZE=$(stat -c%s "${FILE}")
echo "Dump size: ${SIZE} bytes"
if [ "${SIZE}" -lt 200 ]; then
  echo "BACKUP_FAILED: dump file too small"
  exit 1
fi
aws s3 cp "${FILE}" "s3://${BACKUP_BUCKET}/daily/todo-${TS}.archive.gz" --sse AES256
if [ "${DOW}" = "7" ]; then
  aws s3 cp "${FILE}" "s3://${BACKUP_BUCKET}/weekly/todo-${TS}.archive.gz" --sse AES256
fi
echo "BACKUP_OK ${TS}"
