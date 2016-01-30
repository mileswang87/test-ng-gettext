/**
 * Created by moredeveloper on 10/20/15.
 */

declare module gcds {
  interface IResourceInternalService {
    $request: any;
  }
  interface IResource {
    parent: IResourceModel;
    service: IResourceInternalService;
    toJSON(): any;
    assign(data:any): any;
    getResourceUrl():  string;
  }

  interface IFetchableResource extends IResource {
    fetch(config:any): angular.IPromise<any>;
    afterDataFetched(response:any): angular.IPromise<IModelData>
  }


  interface IAutoSyncResource extends IFetchableResource {
    onLogin(): any;
    onSync(): any;
    onLogout(): any;
  }

  interface IModelData {
    pk: number;
  }

  interface IResourceModelStatic {
    new (data?:gcds.IModelData, parent?:gcds.IResourceModel, collection?:gcds.IResourceCollection): IResourceModel;
    getRoute(): any;
  }

  interface IResourceModel extends IResource {
    pk: number;
    isNew: boolean;
    data: IModelData;
    nested: {
      [name: string]: IResourceCollection
    }
    collection: IResourceCollection;
    assign(data:IModelData): IResourceModel;
    attrAccessible(...args:any[]);
  }


  interface IResourceCollection extends IResource {
    list: Array<IResourceModel>;
    modelClass: IResourceModelStatic;

    getById(id:number): IResourceModel;

    assign(data:Array<any>);

    addRef(model:IResourceModel);
    removeRef(model:IResourceModel):IResourceModel;
    _reset();
  }

  interface IAttributeConfig {
    name: string;
    getter: boolean;
    setter: boolean;
  }

}