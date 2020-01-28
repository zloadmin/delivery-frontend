
## Delivery frontend

### Deploying

For installation you need clone app to laravel root dir:

```
git clone https://github.com/zloadmin/delivery-frontend.git
```

```
cd ./delivery-frontend
```
Copy assets to public dir
```
cp ./public/assets/ ../public/assets -r
```
Install packets
```
npm i
```
Build
```
chmod 750 ./build
```
```
./build
```
Next updating
```
git pull
```
```
./build
```

##### Change laravel controller
```
app/Http/Controllers/ShopAppController.php
```

```
private function getShopPage() : string
    {
        return \File::get(public_path() . '/delivery-frontend/index1.html');
    }
```
##### Optimize
```
php artisan optimize
```
