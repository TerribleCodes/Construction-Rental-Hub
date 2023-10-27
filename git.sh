#!/usr/bin/bash

git status

echo "Proceed? Enter 'y' to proceed or 'n' to exit"

read proceed

if [[ $proceed == 'y' ]]
then
	git add .
	echo "Enter a commit message: "
	read message
	git commit -m "$message"
	git push
elif [[ $proceed == 'n' ]]
then
	echo "Quitting..."
else
	echo "Invalid Input. Quitting..."
fi