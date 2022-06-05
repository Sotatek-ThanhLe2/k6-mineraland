test:
	docker run --rm -i grafana/k6 run - <main.js

load-test:
	docker run --rm -i grafana/k6 run - <load-test.js
