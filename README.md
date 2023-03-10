# snireverseproxy (nodejs)

This a simple SNI-based reverse proxy written in nodejs. This is good for bridging websites (IPv4<->IPv6) among other things. This will not work with ESNI/ECH.

## Instructions
```
git clone https://github.com/realrasengan/snireverseproxy
node snireverseproxy.js
```

No other external dependencies required other than nodejs.

## Configuration

You can simply edit snireverseproxy.conf:
```
"www.domainname.com":"ip.address.goes.here"
```

## Copyright

Copyright (c) 2023 Andrew Lee <andrew@imperialfamily.com>

All Rights Reserved.


MIT Licensed.


