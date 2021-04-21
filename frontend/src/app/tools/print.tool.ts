import { Component, OnInit } from '@angular/core';
import { Impress } from '../class/Impress.class';
import { Value } from '../class/Value.class';

export class Print {

	public ln = new Impress();

	constructor(){
		this.common();
		this.debug();
		this.error();
		this.info();
		this.note();
		this.success();
		this.warning();
	}

	private common() {
		this.ln.common = new Value();
		this.ln.common.tag = this.tag('COMMON');
		this.ln.common.color = this.color('COMMON');
	}
	private debug() {
		this.ln.debug = new Value();
		this.ln.debug.tag = this.tag('DEBUG');
		this.ln.debug.color = this.color('DEBUG');
	}
	private error() {
		this.ln.error = new Value();
		this.ln.error.tag = this.tag('ERROR');
		this.ln.error.color = this.color('ERROR');
	}
	private info() {
		this.ln.info = new Value();
		this.ln.info.tag = this.tag('INFO');
		this.ln.info.color = this.color('INFO');
	}
	private note() {
		this.ln.note = new Value();
		this.ln.note.tag = this.tag('NOTE');
		this.ln.note.color = this.color('NOTE');
	}
	private success() {
		this.ln.success = new Value();
		this.ln.success.tag = this.tag('SUCCESS');
		this.ln.success.color = this.color('SUCCESS');
	}
	private warning() {
		this.ln.warning = new Value();
		this.ln.warning.tag = this.tag('WARNING');
		this.ln.warning.color = this.color('WARNING');
	}

	private tag(type: string): string {
		switch(type){
			case 'COMMON': return '%cCOMMON';
			case 'DEBUG': return '%cDEBUG';
			case 'ERROR': return '%ERROR';
			case 'INFO': return '%cINFO';
			case 'NOTE': return '%cNOTE';
			case 'SUCCESS': return '%cSUCCESS';
			case 'WARNING': return '%cWARNING';
		}
	}

	private color(type: string): string {
		switch(type){
			case 'COMMON': return 'background-color: #607D8B; border-radius: 25px; padding: 2px 10px';
			case 'DEBUG': return 'background-color: #E0430B; border-radius: 25px; padding: 2px 10px';
			case 'ERROR': return 'background-color: #D32F2F; border-radius: 25px; padding: 2px 10px';
			case 'INFO': return 'background-color: #0288D1; border-radius: 25px; padding: 2px 10px';
			case 'NOTE': return 'background-color: #9C27B0; border-radius: 25px; padding: 2px 10px';
			case 'SUCCESS': return 'background-color: #689F38; border-radius: 25px; padding: 2px 10px';
			case 'WARNING': return 'background-color: #FBC02D; border-radius: 25px; padding: 2px 10px; color: black;';
		}
	}
};
