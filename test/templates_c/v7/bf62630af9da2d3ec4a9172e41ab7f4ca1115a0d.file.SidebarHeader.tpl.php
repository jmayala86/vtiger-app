<?php /* Smarty version Smarty-3.1.7, created on 2026-06-09 07:20:47
         compiled from "/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Calendar/partials/SidebarHeader.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1849956526a27becfbfb195-19326741%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'bf62630af9da2d3ec4a9172e41ab7f4ca1115a0d' => 
    array (
      0 => '/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Calendar/partials/SidebarHeader.tpl',
      1 => 1627027149,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1849956526a27becfbfb195-19326741',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'SELECTED_MENU_CATEGORY' => 0,
    'MODULE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_6a27becfbfe44',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_6a27becfbfe44')) {function content_6a27becfbfe44($_smarty_tpl) {?>

<?php $_smarty_tpl->tpl_vars['APP_IMAGE_MAP'] = new Smarty_variable(Vtiger_MenuStructure_Model::getAppIcons(), null, 0);?>
<div class="col-sm-12 col-xs-12 app-indicator-icon-container app-<?php echo $_smarty_tpl->tpl_vars['SELECTED_MENU_CATEGORY']->value;?>
">
	<div class="row" title="<?php echo strtoupper(vtranslate("LBL_CALENDAR",$_smarty_tpl->tpl_vars['MODULE']->value));?>
">
		<span class="app-indicator-icon fa fa-calendar"></span>
	</div>
</div>

<?php echo $_smarty_tpl->getSubTemplate ("modules/Vtiger/partials/SidebarAppMenu.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
<?php }} ?>