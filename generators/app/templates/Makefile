all: install-requirements sshcfg playbooks/all.yml

requirements.txt: requirements.in
	pip-compile requirements.in
requirements.dev.txt: requirements.dev.in
	pip-compile requirements.dev.in
install-requirements: requirements.txt requirements.dev.txt
	pip-sync requirements.txt requirements.dev.txt
sshcfg: <%- serversYamlPath %>
	make-sshcfg
playbooks/all.yml: <%- serversYamlPath %>
	make-all-playbook
