/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	"use strict";
	config.toolbarGroups = [
		{name : 'insert'} ,
		{ name: 'basicstyles'},
		{ name: 'clipboard'},
		{ name: 'paragraph', groups: [ 'align'] },
		{ name: 'colors' },
		{ name: 'styles' },
	];
	//config.extraPlugins = 'html5video';
	config.removeButtons = 'Subscript,Superscript,Format,Styles,Strike,JustifyBlock,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,InsertPre,Image,Flash';
	config.contentsCss = 'fonts.css';
	//config.font_names = 'Arial;Tahoma;BYekan,Koodak2,HiwebTitrBold,HiwebRoya,HiwebNazanin,HiwebMitra'+ config.font_names;
	config.font_names = 'HiwebMitra/HiwebMitra'+ config.font_names;
	config.font_defaultLabel = 'HiwebMitra';
	config.fontSize_defaultLabel = '26px';
	config.fontSize_sizes = '22/22px;24/24px;26/26px;36/36px;48/48px;72/72px';
	config.defaultLanguage = 'fa';
	config.language = "fa";
	config.height = '55em';
};
