<?php
$template = '/pages/_test.twig';
$data = [
    'title' => 'Test',
    'nav_active' => 'solution',
    'users' => [
        ['username' => 'Fabien', 'cat' => 'test'],
        ['username' => 'Fabien', 'cat' => 'test'],
    ],
];
include $_SERVER['DOCUMENT_ROOT'] . '/templates/base.php';
?>

