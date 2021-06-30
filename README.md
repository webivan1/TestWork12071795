**You should have a docker**

- Install tool make for reading Makefile

**Run commands**

- `make install`
- `make start`

You should wait some minutes to run the server `http://localhost:8080`

**If you don't have a make tools**

- `docker-compose run --rm crud-php-cli composer install`
- `docker-compose run --rm crud-php-cli php artisan storage:link`
- `docker-compose run --rm crud-php-cli php artisan migrate`
- `docker-compose run --rm crud-php-cli php artisan passport:install`
- `docker-compose run --rm crud-php-cli php artisan db:seed`
- `docker-compose run --rm crud-client npm install`

**Run server**

- `docker-compose up --build -d`
