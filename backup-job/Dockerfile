FROM mongo:7.0
RUN apt-get update && apt-get install -y --no-install-recommends awscli ca-certificates && rm -rf /var/lib/apt/lists/*
COPY backup.sh /backup.sh
COPY restore.sh /restore.sh
RUN sed -i 's/\r$//' /backup.sh /restore.sh && chmod +x /backup.sh /restore.sh
ENTRYPOINT ["/backup.sh"]
