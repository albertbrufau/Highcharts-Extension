all: jslint compress
compress:
	java -jar ../closure-compiler/compiler.jar --js=src/highcharts-extension.js --js_output_file=build/highcharts-extension.min.js
jslint:
	../jslint/scripts/run-jslint.sh src/highcharts-extension.js
