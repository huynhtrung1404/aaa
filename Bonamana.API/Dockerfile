FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app

COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet build --no-restore --configuration release
RUN dotnet dev-certs https --clean
RUN dotnet dev-certs https --trust
RUN dotnet publish -c release -o out --no-restore --no-build

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /run
COPY --from=build /app/out .
COPY --from=build /root/.dotnet/corefx/cryptography/x509stores/my/* /root/.dotnet/corefx/cryptography/x509stores/my/
ENTRYPOINT [ "dotnet", "Bonamana.API.dll" ]