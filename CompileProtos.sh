#!/usr/bin/env bash

read -p "Enter path to root proto directory: " rootProtoPath

read -p "Enter path to output directory: " outputDirectory

if [[ "${rootProtoPath: -1}" != "/"  ]]; then
    rootProtoPathWithSlash="${rootProtoPath}/"
fi

# clear output directory
if [[ "${rootProtoPath: -1}" != "/"  ]]; then
    rm -rf "${outputDirectory}/*"
else
    rm -rf "${outputDirectory}*"
fi

# pulls full path from current directory
protoFiles=$(find $rootProtoPath -type f -name "*.proto")


# strip the extra non-root paths
formattedProtoFilePaths=()

for file in $protoFiles
do
    if [[ "${rootProtoPath: -1}" != "/"  ]]; then
        formattedProtoFilePaths+=(${file/$rootProtoPathWithSlash/})
    else
        formattedProtoFilePaths+=(${file/$rootProtoPath/})
    fi
    
done

# compile the files
for protoFile in ${formattedProtoFilePaths[@]}
do
    protoc --proto_path=$rootProtoPath $protoFile \
        --js_out=import_style=commonjs:$outputDirectory \
        --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$outputDirectory
done
