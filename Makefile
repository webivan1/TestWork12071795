install:
	docker-compose run --rm crud-php-cli composer install
	docker-compose run --rm crud-php-cli cp ./.env.example ./.env
	docker-compose run --rm crud-php-cli php artisan key:generate
	docker-compose run --rm crud-php-cli php artisan storage:link
	docker-compose run --rm crud-php-cli php artisan migrate
	docker-compose run --rm crud-php-cli php artisan passport:install
	docker-compose run --rm crud-php-cli php artisan db:seed
	docker-compose run --rm crud-client npm install

clear:
	docker-compose run --rm crud-php-cli php artisan migrate:reset
	docker-compose run --rm crud-php-cli rm -rf ./.env
	docker-compose run --rm crud-php-cli rm -rf ./storage/app/public/images/*
	docker-compose run --rm crud-php-cli rm -rf ./vendor
	docker-compose run --rm crud-php-cli rm -f ./public/storage
	docker-compose run --rm crud-node rm -f ./node_modules

start:
	docker-compose up --build -d

stop:
	docker-compose down
