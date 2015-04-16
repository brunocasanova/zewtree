# Zewtree Makefile
 
APP_NAME = "Zewtree"

APP_PROTOCOL = "http://"
APP_PORT = 8080

APP_PATH_PRODUCTION = lib/index.js
APP_PATH_DEV = lib/index.js

DEBUG_PORT = 5858

ZEWTREE_LOG = \x1b[36m[ZEWTREE]:\x1b[0m

## APP CONTROL

## INSTALL ZEWTREE
zewtree: zewtree-msg zewtree-install zewtree-update test
zewtree-msg: ;@echo "${ZEWTREE_LOG} \x1b[31m[CONFIGURE]\x1b[0m initializing zewtree..."; \

## INSTALL NPM
zewtree-install: prune clean cache-clean install

## UPDATE NPM
zewtree-update: cache-clean update

## RUN PRODUCTION MODE
production: ;@echo; \
	node ${APP_PATH_PRODUCTION}

## RUN DEV MODE
dev: ;@echo; \
	DEV=1 nodemon --debug ${APP_PATH_DEV} --dev

debug: ;@echo "${ZEWTREE_LOG} \x1b[31m[DEV]\x1b[0m debug mode running...\n\x1b[32m[DEBUG]:\x1b[0m ${APP_PROTOCOL}127.0.0.1:${APP_PORT}/debug?port=${DEBUG_PORT}"; \
	node-inspector --cli --preload=true & ENV=dev nodemon --debug ${APP_PATH_DEV}

## NPM CONTROL

## CLEAN NODE MODULES
clean: ;@echo "${ZEWTREE_LOG} \x1b[31m[CLEAN]\x1b[0m modules..."; \
	rm -rf node_modules

## PRUNE NODE MODULES
prune: ;@echo "${ZEWTREE_LOG} \x1b[31m[PRUNE]\x1b[0m modules..."; \
	npm prune

cache-clean: ;@echo "${ZEWTREE_LOG} \x1b[31m[CACHE]\x1b[0m cleaning..."; \
	npm cache clean

## INSTALL MODULES
install: ;@echo "${ZEWTREE_LOG} \x1b[31m[INSTALL]\x1b[0m proceeding..."; \
	npm install

## UPDATE MODULES
update: ;@echo "${ZEWTREE_LOG} \x1b[31m[UPDATE]\x1b[0m proceeding..."; \
	npm update

## RUNNING TESTS
test: ;@echo "${ZEWTREE_LOG} \x1b[31m[TEST]\x1b[0m testing zewtree..."; \
	mocha

## GIT CONTROL

DEFAULT_COMMIT = "Default commit `date +'%d/%m/%y at %H:%M:%S'`"

deploy-zewtree: deploy-msg status commit-add commit-remove commit push-origin push-upstream log

deploy-production: deploy-msg status commit-add commit-remove commit push-upstream log
deploy-origin: deploy-msg status commit-add commit-remove commit push-origin log

deploy-msg: ;@echo "${ZEWTREE_LOG} \x1b[31m[DEPLOY]\x1b[0m initialized!"; \

push-origin: ;@echo "${ZEWTREE_LOG} \x1b[31m[GIT][PUSH][ORIGIN]\x1b[0m push to origin..."; \
	git push origin master -f

push-upstream: ;@echo "${ZEWTREE_LOG} \x1b[31m[GIT][PUSH][UPSTREAM]\x1b[0m push to Production..."; \
	git push upstream master -f

commit-add: ;@echo "${ZEWTREE_LOG} \x1b[31m[GIT][ADD]\x1b[0m files to stack..."; \
	git add .

commit-remove: ;@echo "${ZEWTREE_LOG} \x1b[31m[GIT][REMOVE]\x1b[0m files from stack..."; \
	git add -u

commit: ;@echo "${ZEWTREE_LOG} \x1b[31m[GIT][COMMIT]\x1b[0m commit changes to the stack..."; \
	git commit -m $(DEFAULT_COMMIT)

status: ;@echo "${ZEWTREE_LOG} \x1b[31m[GIT][STATUS]\x1b[0m see the status from the stack..."; \
	git status

log: ;@echo "${ZEWTREE_LOG} \x1b[31m[GIT][RESUME]\x1b[0m see the commits done..."; \
	git log --graph --decorate --oneline

.PHONY: test install clean update debug deploy add commit status


