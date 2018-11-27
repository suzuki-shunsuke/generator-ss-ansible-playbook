include Makefile.common

env=vagrant

pylib: requirements.txt
	pip-sync requirements.txt
requirements.txt: requirements.in
	pip-compile requirements.in
