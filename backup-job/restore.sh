#!/bin/bash
set -euo pipefail
echo "RESTORE_START $(date -u +%Y-%m-%dT%H:%M:%SZ) key=${RESTORE_KEY}"
aws s3 cp "s3://${BACKUP_BUCKET}/${RESTORE_KEY}" /tmp/restore.archive.gz
mongorestore --uri="${MONGODB_URI}" --archive=/tmp/restore.archive.gz --gzip --nsFrom='test.*' --nsTo='todo_restore.*' --drop
SRC=$(mongosh "${MONGODB_URI}" --quiet --eval 'db.getSiblingDB("test").todos.countDocuments({})')
DST=$(mongosh "${MONGODB_URI}" --quiet --eval 'db.getSiblingDB("todo_restore").todos.countDocuments({})')
echo "source count=${SRC} restored count=${DST}"
if [ "${SRC}" = "${DST}" ]; then echo "RESTORE_VERIFIED"; else echo "RESTORE_MISMATCH"; exit 1; fi
echo "RESTORE_END $(date -u +%Y-%m-%dT%H:%M:%SZ)"
