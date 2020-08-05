Set ws = CreateObject("Wscript.Shell")
ws.run "wsl -d ubuntu -u root /etc/init.wsl start", vbhide