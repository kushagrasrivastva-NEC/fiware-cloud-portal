var OSRouter=Backbone.Router.extend({rootView:void 0,tabs:new NavTabModels([{name:"Project",active:!1,url:"#nova"},{name:"Admin",active:!0,url:"#syspanel"}]),top:new TopBarModel({title:"Overview:",subtitle:""}),navs:new NavTabModels([]),next:void 0,loginModel:void 0,instancesModel:void 0,volumesModel:void 0,volumeSnapshotsModel:void 0,flavors:void 0,images:void 0,keypairsModel:void 0,projects:void 0,containers:void 0,vdcs:void 0,currentView:void 0,timers:[],routes:{"auth/login":"login","auth/switch/:id/":"switchTenant",
"auth/logout":"logout"},initialize:function(){this.loginModel=new LoginStatus;this.instancesModel=new Instances;this.volumesModel=new Volumes;this.volumeSnapshotsModel=new VolumeSnapshots;this.flavors=new Flavors;this.images=new Images;this.keypairsModel=new Keypairs;this.projects=new Projects;this.containers=new Containers;this.vdcs=new VDCs;Backbone.View.prototype.close=function(){this.unbind();if(this.onClose)this.onClose()};this.rootView=new RootView({model:this.loginModel,auth_el:"#auth",root_el:"#root"});
this.route("","init",this.wrap(this.init,this.checkAuth));this.route("#","init",this.wrap(this.init,this.checkAuth));this.route("syspanel","syspanel",this.wrap(this.sys_overview,this.checkAuth));this.route("syspanel/","syspanel",this.wrap(this.sys_overview,this.checkAuth));this.route("settings/","settings",this.wrap(this.showSettings,this.checkAuth));this.route("nova","nova",this.wrap(this.nova_overview,this.checkAuth));this.route("nova/","nova",this.wrap(this.nova_overview,this.checkAuth));this.route("nova/volumes/",
"volumes",this.wrap(this.nova_volumes,this.checkAuth));this.route("nova/access_and_security/","access_and_security",this.wrap(this.nova_access_and_security,this.checkAuth));this.route("nova/images/","images",this.wrap(this.nova_images,this.checkAuth));this.route("nova/snapshots/","snapshots",this.wrap(this.nova_snapshots,this.checkAuth));this.route("nova/vdcs/","vdcs",this.wrap(this.nova_vdcs,this.checkAuth));this.route("nova/vdcs/:id","vdc",this.wrap(this.nova_vdc,this.checkAuth));this.route("nova/vdcs/:id/:idservice",
"vdcservice",this.wrap(this.nova_vdc_service,this.checkAuth));this.route("nova/vdcs/:id/:idservice/:idinstance/?view=:subview","instance",this.wrap(this.nova_vdc_instance,this.checkAuth));this.route("nova/vdcs/:id/:idservice/:idinstance","instance",this.wrap(this.nova_vdc_instance,this.checkAuth));this.route("home/","home",this.wrap(this.init,this.checkAuth));this.route("syspanel/images/images/","images",this.wrap(this.sys_images,this.checkAuth));this.route("syspanel/instances/","instances",this.wrap(this.sys_instances,
this.checkAuth));this.route("syspanel/services/","services",this.wrap(this.sys_services,this.checkAuth));this.route("syspanel/flavors/","flavors",this.wrap(this.sys_flavors,this.checkAuth));this.route("syspanel/projects/","projects",this.wrap(this.sys_projects,this.checkAuth));this.route("syspanel/users/","users",this.wrap(this.sys_users,this.checkAuth));this.route("syspanel/quotas/","quotas",this.wrap(this.sys_quotas,this.checkAuth));this.route("syspanel/flavors/create","create_flavor",this.wrap(this.create_flavor,
this.checkAuth));this.route("nova/images_and_snapshots/:id/delete","delete_image",this.wrap(this.delete_image,this.checkAuth));this.route("nova/images_and_snapshots/:id/update","edit_image",this.wrap(this.edit_image,this.checkAuth));this.route("nova/images_and_snapshots/:id","consult_image",this.wrap(this.consult_image,this.checkAuth));this.route("nova/images_and_snapshots/:id/launch/","launch_image",this.wrap(this.launch_image,this.checkAuth));this.route("nova/images_and_snapshots/:name/update",
"edit_image",this.wrap(this.edit_image,this.checkAuth));this.route("nova/instances_and_volumes/instances/:id/detail?view=:subview","consult_instance",this.wrap(this.consult_instance,this.checkAuth));this.route("nova/instances_and_volumes/instances/:id/detail","consult_instance",this.wrap(this.consult_instance,this.checkAuth));this.route("nova/instances_and_volumes/volumes/:id/detail","consult_volume",this.wrap(this.consult_volume,this.checkAuth));this.route("objectstorage/containers/","consult_containers",
this.wrap(this.objectstorage_consult_containers,this.checkAuth));this.route("objectstorage/containers/:id/","consult_container",this.wrap(this.objectstorage_consult_container,this.checkAuth))},wrap:function(a,b){var c=Array.prototype.slice;return function(){var d=[a].concat(c.call(arguments,0));return b.apply(this,d)}},checkAuth:function(){var a=arguments[0];this.rootView.options.next_view=Backbone.history.fragment;if(this.loginModel.get("loggedIn")){0==this.timers.length&&(this.add_fetch(this.instancesModel,
4),this.add_fetch(this.volumesModel,4),this.add_fetch(this.images,4),this.add_fetch(this.flavors,4),this.add_fetch(this.volumeSnapshotsModel,4),this.add_fetch(this.containers,4),this.add_fetch(this.vdcs,4),this.loginModel.isAdmin()&&this.add_fetch(this.projects,4));var b=[this].concat(Array.prototype.slice.call(arguments,1));a.apply(this,b)}else console.log("Login needed"),window.location.href="#auth/login"},newContentView:function(a,b){void 0!=a.currentView&&a.currentView.close();a.currentView=b},
init:function(a){window.location.href=a.loginModel.isAdmin()?"#syspanel":"#nova"},login:function(){console.log("Rendering auth");this.rootView.renderAuth()},logout:function(){this.loginModel.clearAll();window.location.href="#auth/login"},switchTenant:function(a){this.loginModel.switchTenant(a);this.navigate(this.rootView.options.next_view,{trigger:!1,replace:!0})},showSettings:function(a){a.top.set({title:"Dashboard Settings"});a.navs=new NavTabModels([{name:"User Settings",active:!0,url:"#settings/"}]);
a.tabs.setActive("");a.showRoot(a,"");var b=new SettingsView({el:"#content"});a.newContentView(a,b);b.render()},showRoot:function(a,b){a.rootView.renderRoot();(new NavTabView({el:"#navtab",model:a.tabs,loginModel:a.loginModel})).render();(new TopBarView({el:"#topbar",model:a.top,loginModel:a.loginModel})).render();var c="Project"==a.tabs.getActive();(new SideBarView({el:"#sidebar",model:a.navs,title:b,showTenants:c,loginModel:a.loginModel})).render()},showSysRoot:function(a,b){a.top.set({title:b});
a.navs=new NavTabModels([{name:"Overview",active:!0,url:"#syspanel/"},{name:"Organizations",active:!1,url:"#syspanel/projects/"},{name:"Flavors",active:!1,url:"#syspanel/flavors/"},{name:"Users",active:!1,url:"#syspanel/users/"},{name:"Quotas",active:!1,url:"#syspanel/quotas/"}]);a.navs.setActive(b);a.tabs.setActive("Admin");a.showRoot(a,"System Panel")},sys_overview:function(a){a.showSysRoot(a,"Overview");var b=new Overview,b=new SysOverviewView({model:b,el:"#content"});a.newContentView(a,b);b.render()},
sys_images:function(a){a.showSysRoot(a,"Images");var b=new ImagesView({model:a.images,el:"#content"});a.newContentView(a,b)},delete_images:function(a){(new DeleteImagesView({model:a.images,el:"body"})).render();a.navigate("#syspanel/images/images/",{trigger:!1,replace:!0})},delete_image:function(a,b){var c=new Image;c.set({id:b});(new DeleteImageView({model:c,el:"body"})).render();a.navigate("#syspanel/images/images/",{trigger:!1,replace:!0})},edit_image:function(a,b){var c=new Image;c.set({id:b});
new UpdateImageView({model:c,el:"body"});a.navigate("#syspanel/images/images/",{trigger:!1,replace:!0})},consult_image:function(a,b){a.showNovaRoot(a,"Images &amp; Snapshots");var c=new Image;c.set({id:b});c=new ConsultImageDetailView({model:c,el:"#content"});a.newContentView(a,c)},launch_image:function(a,b){var c=new Image;c.set({id:b});new LaunchImageView({model:c,flavors:a.flavors,keypairs:a.keypairsModel,el:"body"});a.navigate("#nova/images_and_snapshots/",{trigger:!1,replace:!0})},sys_instances:function(a){a.showSysRoot(a,
"Instances");a.instancesModel.unbind("change");a.instancesModel.alltenants=!0;var b=new InstanceView({model:a.instancesModel,projects:a.projects,flavors:a.flavors,el:"#content"});a.newContentView(a,b)},sys_services:function(a){a.showSysRoot(a,"Services");var b=new Services,b=new ServiceView({model:b,el:"#content"});a.newContentView(a,b);b.render()},sys_flavors:function(a){a.showSysRoot(a,"Flavors");a.flavors.unbind("change");var b=new FlavorView({model:a.flavors,el:"#content"});a.newContentView(a,
b)},create_flavor:function(a){var b=new Flavor;(new CreateFlavorView({model:b,el:"body"})).render();a.navigate("#syspanel/flavors/",{trigger:!1,replace:!0})},sys_projects:function(a){a.showSysRoot(a,"Organizations");var b=new ProjectView({model:a.projects,el:"#content"});a.newContentView(a,b)},sys_users:function(a){a.showSysRoot(a,"Users");var b=new Users,b=new UserView({model:b,el:"#content"});a.newContentView(a,b);b.render()},sys_quotas:function(a){a.showSysRoot(a,"Quotas");var b=new Quotas,b=new QuotaView({model:b,
el:"#content"});a.newContentView(a,b);b.render()},showNovaRoot:function(a,b){a.top.set({title:b});a.navs=new NavTabModels([{name:"Compute",type:"title"},{name:"Overview",active:!0,url:"#nova/"},{name:"Virtual Data Centers",active:!1,url:"#nova/vdcs/"},{name:"Images",active:!1,url:"#nova/images/"},{name:"Volumes",active:!1,url:"#nova/volumes/"},{name:"Snapshots",active:!1,url:"#nova/snapshots/"},{name:"Storage",type:"title"},{name:"Containers",active:!1,url:"#objectstorage/containers/"}]);a.navs.setActive(b);
a.tabs.setActive("Project");a.showRoot(a,"Organization")},nova_overview:function(a){a.showNovaRoot(a,"Overview");var b=new NovaOverviewView({el:"#content"});a.newContentView(a,b);b.render()},nova_access_and_security:function(a){a.showNovaRoot(a,"Access &amp; Security");var b=new AccessAndSecurityView({el:"#content",model:a.keypairsModel});a.newContentView(a,b)},nova_images:function(a){a.showNovaRoot(a,"Images");var b=new ImagesView({model:a.images,volumeSnapshotsModel:a.volumeSnapshotsModel,instancesModel:a.instancesModel,
volumesModel:a.volumesModel,flavors:a.flavors,keypairs:a.keypairsModel,el:"#content"});a.newContentView(a,b)},nova_snapshots:function(a){a.showNovaRoot(a,"Snapshots");var b=new NovaSnapshotsView({images:a.images,volumeSnapshotsModel:a.volumeSnapshotsModel,instancesModel:a.instancesModel,volumesModel:a.volumesModel,flavors:a.flavors,keypairs:a.keypairsModel,el:"#content"});a.newContentView(a,b)},nova_vdcs:function(a){a.showNovaRoot(a,"Virtual Data Centers");var b=new VDCsView({model:a.vdcs,el:"#content"});
a.newContentView(a,b)},nova_vdc:function(a,b){a.showNovaRoot(a,"Virtual Data Centers");var c=new VDCServices({vdc:b}),c=new VDCView({model:c,vdc:b,el:"#content",flavors:a.flavors,images:a.images,keypairs:a.keypairsModel});a.newContentView(a,c)},nova_vdc_service:function(a,b,c){a.showNovaRoot(a,"Virtual Data Centers");c=new VDCService({id:c});b=new VDCServiceView({model:c,flavors:a.flavors,vdc:b,el:"#content"});a.newContentView(a,b)},nova_vdc_instance:function(a,b,c,d,e){a.showNovaRoot(a,"Virtual Data Centers");
var f=new Instance;f.set({id:d});void 0==e&&(e="overview");b=new InstanceDetailView({model:f,subview:e,vdc:b,service:c,el:"#content"});a.newContentView(a,b)},nova_volumes:function(a){a.showNovaRoot(a,"Volumes");a.instancesModel.alltenants=!1;var b=new NovaVolumesView({model:a.volumesModel,volumeSnapshotsModel:a.volumeSnapshotModel,flavors:a.flavors,el:"#content"});a.newContentView(a,b)},objectstorage_consult_containers:function(a){a.showNovaRoot(a,"Containers");var b=new ObjectStorageContainersView({model:a.containers,
el:"#content"});a.newContentView(a,b)},objectstorage_consult_container:function(a,b){a.showNovaRoot(a,"Containers");var c=new Container;c.set({id:b});c=new ObjectStorageContainerView({model:c,el:"#content"});a.newContentView(a,c)},consult_volume:function(a,b){a.showNovaRoot(a,"Volumes");var c=new Volume;c.set({id:b});c=new VolumeDetailView({model:c,el:"#content"});a.newContentView(a,c)},clear_fetch:function(){for(var a in this.timers)clearInterval(this.timers[a]);this.timers=[]},add_fetch:function(a,
b){a.fetch();this.timers.push(setInterval(function(){a.fetch()},1E3*b))}});