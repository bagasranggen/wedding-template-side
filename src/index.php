<?php
$template = '/pages/_index.twig';
$data = [
    'breadcrumb' => [
        ['label' => 'Home', 'link' => '/'],
        ['label' => 'Test', 'link' => '#'],
        ['label' => 'Library', 'link' => '#'],
    ],
    'title' => 'Home',
    'nav_active' => 'why',
    'users' => [['username' => 'Fabien']]
];
include $_SERVER['DOCUMENT_ROOT'] . '/templates/base.php';
?>