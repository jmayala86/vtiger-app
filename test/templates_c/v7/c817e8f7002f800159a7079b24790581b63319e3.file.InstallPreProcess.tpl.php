<?php /* Smarty version Smarty-3.1.7, created on 2026-06-09 08:18:22
         compiled from "/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Install/InstallPreProcess.tpl" */ ?>
<?php /*%%SmartyHeaderCode:8161495006a27be3e6e7f06-61071699%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'c817e8f7002f800159a7079b24790581b63319e3' => 
    array (
      0 => '/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Install/InstallPreProcess.tpl',
      1 => 1627027149,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '8161495006a27be3e6e7f06-61071699',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_6a27be3e6eaeb',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_6a27be3e6eaeb')) {function content_6a27be3e6eaeb($_smarty_tpl) {?>

<input type="hidden" id="module" value="Install" />
<input type="hidden" id="view" value="Index" />
<div class="container-fluid page-container">
	<div class="row">
		<div class="col-sm-6">
			<div class="logo">
				<img src="<?php echo vimage_path('logo.png');?>
"/>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="head pull-right">
				<h3><?php echo vtranslate('LBL_INSTALLATION_WIZARD','Install');?>
</h3>
			</div>
		</div>
	</div>
<?php }} ?>