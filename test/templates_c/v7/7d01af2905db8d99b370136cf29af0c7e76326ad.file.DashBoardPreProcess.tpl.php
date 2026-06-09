<?php /* Smarty version Smarty-3.1.7, created on 2026-06-09 07:20:38
         compiled from "/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Vtiger/dashboards/DashBoardPreProcess.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1449048206a27bec6262261-25544338%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '7d01af2905db8d99b370136cf29af0c7e76326ad' => 
    array (
      0 => '/home/u347972489/domains/vtiger.holaenroque.com/public_html/includes/runtime/../../layouts/v7/modules/Vtiger/dashboards/DashBoardPreProcess.tpl',
      1 => 1627027149,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1449048206a27bec6262261-25544338',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_6a27bec626c1e',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_6a27bec626c1e')) {function content_6a27bec626c1e($_smarty_tpl) {?>



<?php echo $_smarty_tpl->getSubTemplate ("modules/Vtiger/partials/Topbar.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>


<div class="container-fluid app-nav">
    <div class="row">
        <?php echo $_smarty_tpl->getSubTemplate ("modules/Vtiger/partials/SidebarHeader.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

        <?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("ModuleHeader.tpl",$_smarty_tpl->tpl_vars['MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

    </div>
</div>
</nav>
 <div id='overlayPageContent' class='fade modal content-area overlayPageContent overlay-container-60' tabindex='-1' role='dialog' aria-hidden='true'>
        <div class="data">
        </div>
        <div class="modal-dialog">
        </div>
    </div>

<?php }} ?>