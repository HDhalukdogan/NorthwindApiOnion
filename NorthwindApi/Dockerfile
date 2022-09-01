#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["NorthwindApi/NorthwindApi.csproj", "NorthwindApi/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Persistence/Persistence.csproj", "Persistence/"]
RUN dotnet restore "NorthwindApi/NorthwindApi.csproj"
COPY . .
WORKDIR "/src/NorthwindApi"
RUN dotnet build "NorthwindApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NorthwindApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NorthwindApi.dll"]