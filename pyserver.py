#!/usr/bin/env python
import http.server
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import socketserver

## importing socket module
import socket
## getting the hostname by socket.gethostname() method
hostname = socket.gethostname()
## getting the IP address using socket.gethostbyname() method
ip_address = socket.gethostbyname(hostname)
## printing the hostname and ip_address
print(f"Hostname: {hostname}")
print(f"IP Address: {ip_address}")

port=8080
print("Running on port %d" % port)

print(f"Access http://{ip_address}:{port}/hsp-custom-ui.html to view the web player in your local browser")

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map['.wasm'] = 'application/wasm'

httpd = socketserver.TCPServer((ip_address, port), Handler)
httpd.serve_forever()
