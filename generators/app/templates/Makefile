all: install-requirements _roles sshcfg playbooks/all.yml

requirements.txt: requirements.in
	pip-compile requirements.in
requirements.dev.txt: requirements.dev.in
	pip-compile requirements.dev.in
install-requirements: requirements.txt requirements.dev.txt
	pip-sync requirements.txt requirements.dev.txt
_roles: roles.yml install-requirements
	ansible-galaxy install -r roles.yml
sshcfg: <%- serversYamlPath %> lib/sshcfg.j2 bin/make-sshcfg lib/make_sshcfg.py
	python bin/make-sshcfg
playbooks/all.yml: <%- serversYamlPath %> bin/make-all-playbook lib/make_all_playbook.py
	python bin/make-all-playbook
