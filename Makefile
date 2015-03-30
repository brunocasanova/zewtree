#
# Zewtree Makefile
#
 
APP_NAME = "Zewtree"
APP_PORT = 8080
APP_PATH ?= lib/cluster.js
APP_PROTOCOL = "http://"
DEBUG_PORT = 5858

## UPDATE
zewtree: clean install update test

## RUN PRODUCTION MODE
web: ;@echo "\x1b[36m[ZEWTREE]: [PRODUCTION] mode running... \x1b[0m"; \
	ENV=production node ${APP_PATH}

## RUN DEV MODE
dev: ;@echo "\x1b[36m[ZEWTREE]: [DEV] mode running...\n[DEBUG]: ${APP_PROTOCOL}127.0.0.1:${APP_PORT}/debug?port=${DEBUG_PORT} \x1b[0m"; \
	ENV=dev nodemon --debug ${APP_PATH} & node-inspector

## CLEAN NODE MODULES
clean: ;@echo "[ZEWTREE]: Cleaning modules..."; \
	rm -rf node_modules

## INSTALL MODULES
install: ;@echo "[ZEWTREE]: Installing..."; \
	npm install

## UPDATE MODULES
update: ;@echo "[ZEWTREE]: Updating..."; \
	npm update

## RUNNING TESTS
test: ;@echo "[ZEWTREE]: Testing..."; \
	mocha


