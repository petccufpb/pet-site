import sys

mod = ""

prefix = '/***/ "(app-pages-browser)/../node_modules'

for l in open(f".next/static/chunks/app{sys.argv[1]}/page.js"):
    if l.startswith(prefix):
        mod = l[len(prefix):].strip()
    elif l.startswith('eval('):
        print("%s\t%s" % (len(l), mod))
