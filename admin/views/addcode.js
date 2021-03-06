<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<title>thêm mã code </title>
		<meta name="description" content="Doodle is a Dashboard & Admin Site Responsive Template by hencework." />
		<meta name="keywords" content="admin, admin dashboard, admin template, cms, crm, Doodle Admin, Doodleadmin, premium admin templates, responsive admin, sass, panel, software, ui, visualization, web app, application" />
		<meta name="author" content="hencework"/>
		<!-- Favicon -->
		<link rel="shortcut icon" href="favicon.ico">
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<!-- vector map CSS -->
		<link href="/vendors/vectormap/jquery-jvectormap-2.0.2.css" rel="stylesheet" type="text/css"/>
		
		<!-- Footable CSS -->
		<link href="/vendors/bower_components/FooTable/compiled/footable.bootstrap.min.css" rel="stylesheet" type="text/css"/>
		<!-- Custom CSS -->
			<link href="/vendors/bower_components/sweetalert/dist/sweetalert.css" rel="stylesheet" type="text/css">
		<link href="/dist/css/style.css" rel="stylesheet" type="text/css">
		<style type="text/css">
		
		</style>
	</head>
	<body>
	<!--Preloader-->

		<% include partials/head %>			
				
			<!-- Main Content -->
			<div class="page-wrapper">
				<div class="container-fluid">
					<!-- Title -->
					<div class="row heading-bg">
						<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
						  <h5 class="txt-dark">foo table</h5>
						</div>
						<!-- Breadcrumb -->
						<div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
						  <ol class="breadcrumb">
							<li><a href="/">trang chủ</a></li>
							<li><a href="/#"><span>table</span></a></li>
							<li class="active"><span>foo table</span></li>
						  </ol>
						</div>
						<!-- /Breadcrumb -->
					</div>
					<!-- /Title -->
					
				
					
					<!-- Row -->
					<div class="row">
						<div class="col-sm-12">
							<div class="panel panel-default card-view">
								<div class="panel-heading">
									<div class="pull-left">
										<h6 class="panel-title txt-dark">Editing Table</h6>
									</div>
									<div class="clearfix"></div>
								</div>
								<div class="panel-wrapper collapse in">
									<div class="panel-body">
										<div class="table-wrap">
											<table id="footable_2" class="table" data-paging="true" data-filtering="true" data-sorting="true">
												<thead>
												<tr>
													<th  data-breakpoints="xs">STT</th>
													<th data-name="id" data-breakpoints="xs" data-type="text">ID</th>
													<th data-name="name" data-type="text">tên người dùng</th>
													<th data-name="username" data-breakpoints="xs">username</th>
													<th data-name="email" data-breakpoints="xs">email</th>
													<th data-name="password" data-breakpoints="xs">password</th>
												
													<th data-breakpoints="xs">is admin</th>

												
												</tr>
												</thead>
												<tbody>
                                                    <%var dem=0;%>
												  <% listuser.forEach((user) => { %>
												<tr >
												<%dem++%>
												<td><%=dem%></td>
													<td><%=user._id%></td>
													<td><%=user.name%></td>
													<td><%=user.username%></td>
													<td><%=user.email%></td>
													<td><%=user.password%></td>
												<td><%=user.isadmin%></td>
												
												</tr>
												 <% }) %>
												
												</tbody>
											</table>

											<!--Editor-->
											<div class="modal fade " id="editor-modal" tabindex="-1" role="dialog" aria-labelledby="editor-title">
											
											<div class="modal-dialog" role="document">
												<form class="modal-content form-horizontal" id="editor" style="width: 100%;">
													<div class="modal-header">
														<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
														<h5 class="modal-title" id="editor-title">Add Row</h5>
													</div>
													<div class="modal-body">
														<input type="text" id="id" name="id" class="hidden"/>
														<div class="form-group required">
														
															<div class="col-sm-12">
																<label for="name" class=" control-label">tên người dùng</label>
																<input type="text" class="form-control" id="name" name="name" placeholder="tên người dùng" required>
															</div>
														</div>
														<div class="form-group required">
															<div class="col-sm-12">
															<label for="username" class="control-label">username</label>

																<input type="text" class="form-control" id="username" name="username" placeholder="username" required>
															</div>
														</div>
														
														<div class="form-group">
															<div class="col-sm-12">
															<label for="email" class="control-label">email</label>

																<input type="email" class="form-control" id="email" name="email" placeholder="email ">
															</div>
														</div>
														<div class="form-group required">
															<div class="col-sm-12">
															<label for="password" class=" control-label">password </label>

																<input type="text" class="form-control" id="password" name="password" placeholder="password" required>
															</div>
														</div>
														
															
													</div>
													<div class="modal-footer">
														<button type="submit"  class="btn btn-primary">Save changes</button>
														<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
													</div>
												</form>
											</div>
										</div>
										<!--/Editor-->
									</div>
								</div>
							</div>
							</div>
						</div>
					</div>
					<!-- /Row -->
					
				
					
					<!-- Footer -->
					<footer class="footer container-fluid pl-30 pr-30">
						<div class="row">
							<div class="col-sm-12">
								<p>2017 &copy; Doodle. Pampered by Hencework</p>
							</div>
						</div>
					</footer>
					<!-- /Footer -->
					
				</div>
			</div>
			<!-- /Main Content -->
		
		</div>
		<!-- /#wrapper -->
		
		<!-- JavaScript -->
		<style type="text/css">
			@media (min-width: 768px){

.modal-dialog {
    width: 80%;
    margin: 30px auto;
}}
		</style>
		<!-- jQuery -->
		<script src="vendors/bower_components/jquery/dist/jquery.min.js"></script>
		
		<!-- Bootstrap Core JavaScript -->
		<script src="vendors/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
		<!-- Data table JavaScript -->
		<script src="vendors/bower_components/moment/min/moment.min.js"></script>
			<!-- <script src="dist/js/ajax.jquery.min.js"></script> <--></-->
		<!-- Sweet-Alert  -->

			<script src="vendors/bower_components/sweetalert/dist/sweetalert.min.js"></script>
		<script src="vendors/bower_components/FooTable/compiled/footable.min.js" type="text/javascript"></script>
		<!-- ở đây thêm mơi -->
		<script src="dist/js/listuser.js"></script>
		
		<!-- Slimscroll JavaScript -->
		<script src="dist/js/jquery.slimscroll.js"></script>



		<!-- Tinymce JavaScript -->
		<script src="vendors/bower_components/tinymce/tinymce.min.js"></script>
		<!-- Tinymce Wysuhtml5 Init JavaScript -->
		<script src="dist/js/tinymce-data.js"></script>
		<!-- Fancy Dropdown JS -->
		<script src="dist/js/dropdown-bootstrap-extended.js"></script>
		
		<!-- Owl JavaScript -->
		<script src="vendors/bower_components/owl.carousel/dist/owl.carousel.min.js"></script>
	
		<!-- Switchery JavaScript -->
		<script src="vendors/bower_components/switchery/dist/switchery.min.js"></script>
		
		<!-- Init JavaScript -->
		<script src="dist/js/init.js"></script>

<!-- ajax -->

		
	</body>
</html>