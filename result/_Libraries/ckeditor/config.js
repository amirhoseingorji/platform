/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	
	config.toolbarGroups = [
		{ name: 'basicstyles'},
		{ name: 'paragraph', groups: [ 'align'] },
		'/',
		{ name: 'colors' },
		{ name: 'styles' },
	];
	config.removeButtons = 'Subscript,Superscript,Format,Styles,Strike,JustifyBlock';
	config.font_names = 'arialb;Tahoma;BYekan';
	config.font_defaultLabel = 'BYekan';
	config.fontSize_defaultLabel = '26px';
	config.fontSize_sizes = '22/22px;24/24px;26/26px;36/36px;48/48px;72/72px';
	config.defaultLanguage = 'fa';
	config.language = "fa";
};
