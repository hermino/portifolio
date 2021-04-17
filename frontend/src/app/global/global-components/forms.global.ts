import { Component, OnInit, Injectable, Directive, Inject } from '@angular/core';
import { GlobalService } from './../global-services/global.service';
import { BaseModel } from './../../core/models/base.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

@Directive()
export abstract class GlobalFormsDirective<TModel extends BaseModel, TService extends GlobalService<TModel>> implements OnInit {

  public object: TModel;
  public edit: boolean;
  public loading: boolean;

  constructor(
    public router: Router,
    public globalService: TService,
    public modelType: new ()  => TModel,
    public activatedRoute: ActivatedRoute,
    public toast?: Toast,
    public message?: MessageService,
    public dialog?: Dialog,
    ) {}

  ngOnInit() {
    this.object = this.getNewModel();
  }

  public getNewModel(): TModel {
    return new this.modelType();
  }
}
