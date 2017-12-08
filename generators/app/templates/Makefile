all: ansible

ROLE = all
SSHCFG=<%- sshcfgPath %>
SERVERS_YAML=<%- serversYamlPath %>

ansible: _roles $(SSHCFG) playbooks/all.yml
	ENV=$(ENV) ansible-playbook -i bin/inventory playbooks/$(ROLE).yml
test: _roles $(SSHCFG) playbooks/all.yml
	ENV=$(ENV) ansible-playbook -i bin/inventory --syntax-check playbooks/$(ROLE).yml
_roles: roles.yml pylib
	ansible-galaxy install -r roles.yml
$(SSHCFG): $(SERVERS_YAML) lib/sshcfg.j2 script/make-sshcfg.py lib/make_sshcfg.py
	python script/make-sshcfg.py
playbooks/all.yml: $(SERVERS_YAML) script/make-all-playbook.py lib/make_all_playbook.py
	python script/make-all-playbook.py

pylib: requirements.txt
	pip-sync requirements.txt
requirements.txt: requirements.in
	pip-compile requirements.in
