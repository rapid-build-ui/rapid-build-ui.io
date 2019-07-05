/****************************
 * RB-CODE SNIPPETS CONSTANT
 ****************************/
angular.module('rapid-build').constant('RB_CODE_SNIPPETS', {
	c: `
		#include <stdio.h>
		int main() {
			printf("Hello World!");
			return 0;
		}
	`,
	'c++': `
		#include <iostream>
		using namespace std;
		int main() {
			cout << "Hello, World!";
			return 0;
		}
	`,
	'c#': `
		using System;
		namespace HelloWorld {
			class Hello {
				static void Main() {
					Console.WriteLine("Hello World!");
				}
			}
		}
	`,
	coffeescript: `
		# Hello world in CoffeeScript
		init = (name='World') ->
			msg = "Hello #{name}!"
			console.log msg
		init 'Rapid Build UI'
	`,
	cson: `
		name: 'Rapid Build UI'
		type: 'Web Components'
		why: 'Rapid Development'
		awesome: true
	`,
	css: `
		html {
			overflow-y: scroll;
		}
		body {
			margin: 0;
			padding: 0;
		}
	`,
	elm: `
		-- Hello world in Elm
		import Text
		main = Text.plainText "Hello World!"
	`,
	erlang: `
		%% Hello world in Erlang
		-module(hello).
		-export([hello/0]).
		hello() ->
			io:format("Hello World!~n", []).
	`,
	'f#': `
		(* Hello world in F# *)
		printf "Hello World!"
	`,
	go: `
		// Hello world in Go
		package main
		import "fmt"
		func main() {
			fmt.Printf("Hello World!")
		}
	`,
	groovy: `
		// Hello world in Groovy
		println "Hello World!"
	`,
	html: `
		<rb-alert>
			Looking good!
			<rb-icon kind="smile"></rb-icon>
		</rb-alert>
	`,
	java: `
		// Hello world in Java
		class HelloWorld {
			static public void main(String args[]) {
				System.out.println("Hello World!");
			}
		}
	`,
	javascript: `
		// Hello world in JavaScript
		const hello = (name='World') => {
			return \`Hello \${name}!\`;
		}
		hello();
	`,
	json: `
		{
			"name": "Rapid Build UI",
			"type": "Web Components",
			"why": "Rapid Development",
			"awesome": true
		}
	`,
	jsx: `
		// Hello world in JSX
		const element = <h1>Hello World!</h1>;
		ReactDOM.render(
			element,
			document.getElementById('root')
		);
	`,
	less: `
		html {
			overflow-y: scroll;
		}
		body {
			@bumpers: 0;
			margin: @bumpers;
			padding: @bumpers;
		}
	`,
	markdown: `
		# Rapid Build UI
		* Web Components
		* Develop Rapidly!
	`,
	'objective-c': `
		/* Hello world in Objective-C */
		main() {
			puts("Hello World!");
			return 0;
		}
	`,
	ocaml: `
		(* Hello world in OCaml *)
		print_string "Hello World!";;
	`,
	perl: `
		# Hello world in perl
		print "Hello World!";
	`,
	php: `
		<?php
			// Hello world in PHP
			echo 'Hello World!';
		?>
	`,
	powershell: `
		# Hello world in PowerShell
		'Hello World!'
	`,
	python: `
		# Hello world in Python
		print('Hello World!')
	`,
	ruby: `
		# Hello world in Ruby
		puts "Hello World!"
	`,
	sass: `
		html
			overflow-y: scroll
		body
			$bumpers: 0
			margin: $bumpers
			padding: $bumpers
	`,
	scala: `
		// Hello world in Scala
		object HelloWorld extends App {
			println("Hello World!")
		}
	`,
	scss: `
		html {
			overflow-y: scroll;
		}
		body {
			$bumpers: 0;
			margin: $bumpers;
			padding: $bumpers;
		}
	`,
	shell: `
		# Hello world for shell
		echo Hello World!
	`,
	sql: `
		# Hello world in SQL
		SELECT 'Hello World!';
	`,
	stylus: `
		html
			overflow-y: scroll
		body
			bumpers = 0
			margin: bumpers
			padding: bumpers
	`,
	swift: `
		// Hello world in Swift
		println("Hello, world!")
	`,
	text: `
		Default mode is plain text.
	`,
	typescript: `
		// Hello world in TypeScript
		function hello(name: string): string {
			return name;
		}
		hello('World!');
	`,
	xml: `
		<note>
			<to>You</to>
			<from>Rapid Build UI</from>
			<message>Develop Rapidly!</message>
		</note>
	`,
	yaml: `
		--- # Web Components
		name: Rapid Build UI
		awesome: true
	`
});