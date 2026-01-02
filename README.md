# TEST DII

## [ERD URL (click here)](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&dark=auto#G1k_8kGsC-d3tUdu2Xy0WvSoQzorzTgtAj)

syntax create migration
```bash
npm run migrate create <migration-file-name>
```
syntax up migration
```bash
npm run migrate up
```

### ENV
```bash
DATABASE_URL = 
ENV = 
PORT = 
ROLE_SELECTION_SECRET = 
ACCESS_TOKEN_SECRET = 
```

### Project
```bash
> clone this repository
> create file .env
> copy and fill the env value
> run: npm install
> run: npm run migrate up
> npm run dev
```

# ENDPOINT DOCUMENTATION
## AUTH ROUTE
1. SIGN IN ENDPOINT
    ```
    Path:
    /auth/signin

    Method:
    POST
    ```
    ```
    Body Request:
    {
      "username": string (required),
      "password": string (required)
    }
    ```
    ```
    Response:
    {
      "success": boolean,
      "message": string,
      "data": {
          "roles": { value: number, label: string }[],
          "roleSelectionToken": string
      }
    }
    ```

2. SELECT ROLE WHEN LOGIN
    ```
    Path:
    /auth/signin/role

    Method:
    POST
    ```
    ```
    Body Request
    {
      "roleSelectionToken": string (required),
      "selectedRoleId": number (required)
    }
    ```
    ```
    Response
    {
      "success": boolean,
      "message": string,
      "data": {
          "accessToken": string,
          "menu": {
            "id": number,
            "name": string,
            "description": string,
            "children": []
          }[]
      }
    }
    ```


## MENU ROUTE
1. ADD MENU
    ```
    Path:
    /menu

    Method:
    POST
    ```
    ```
    Body Request:
    {
      "name": string,
      "description": string,
      "parentId": number | null,
      "roleId": number
    }
    ```
    ```
    Response:
    {
      "success": boolean,
      "message": string,
    }
    ```

2. SET MENU TO ROLE
    ```
    Path:
    /menu/set-role

    Method:
    POST
    ```
    ```
    Body Request:
    {
      "menuId": number,
      "roleId": number
    }
    ```
    ```
    Response:
    {
      "success": boolean,
      "message": string,
    }
    ```

## ROLE ROUTE
1. ADD ROLE
    ```
    Path:
    /role

    Method:
    POST
    ```
    ```
    Body Request:
    {
      "name": string,
      "description": string
    }
    ```
    ```
    Response:
    {
      "success": boolean,
      "message": string,
    }
    ```


## USER ROUTE
1. ADD USER
    ```
    Path:
    /user

    Method:
    POST
    ```
    ```
    Body Request:
    {
      "username": string,
      "firstName": string,
      "lastName": string | nul,
      "password": string,
      "roleIds": number[]
    }
    ```
    ```
    Response:
    {
      "success": boolean,
      "message": string,
    }
    ```