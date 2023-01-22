# GRPC Comparison

Compare side-by-side the request speed of grpc-web vs normal rest requests


## How to compile protos

Install:
1. [protoc-gen-grpc-web](https://github.com/grpc/grpc-web/releases)
    * Note: you can also globally install it through node with `npm i -g protoc-gen-grpc-web` and run the same commands
2. [protoc](https://grpc.io/docs/protoc-installation/)
3. [protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript/releases)

Ensure that all of these are findable in the PATH

For Windows users, it is recommended to use WSL/WSL2 for compilation due to missing libraries in the current version [github issue](https://github.com/protocolbuffers/protobuf-javascript/issues/142)

Run the CompileProtos.sh file and enter the inputs to generate the client files


# How to run the app

1. Open three terminals
    * One for the client 
    * One for the rest-server
    * One for the grpc-server

2. Run the grpc-server along with the envoy proxy with the commands:

```
# Envoy proxy
docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
    -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.22.0

# Server
node index.js
```

3. Run the rest-server with `node index.js`

4. Run the react app with `npm run start`

5. Have fun!