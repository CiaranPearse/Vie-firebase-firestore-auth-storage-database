Is admin
QWBhjkJqE6VHpZTNSdYdm1AmJXF3

IS normal
mULPAmagVnN00HhtW8G0M6qMrYY2




match /user/{document} {
    allow read: if getRole('subscriber') == true;
    allow update: if getRole('editor') == true;
    allow create, delete: if getRole('admin') == true;
}
// Allow the user to read data if the document has the 'visibility'
// field set to 'public'
match /cities/{city} {
  allow read: if resource.data.visibility == 'public';
}





match /user/{document} {
    allow read: if isAdmin('admin') == true;
    allow update: if getRole('editor') == true;
    allow create, delete: if getRole('admin') == true;
}

// Check if current user is admin
function isAdmin(isAdmin) {
   return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin[isAdmin]
   // check with --> if isAdmin('admin') == true;
}

// Check if current user is level
function getLevel(userLevel) {
   return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userLevel[userLevel]
   // check with --> 
        // if getLevel('free') == true;
        // if getLevel('personal') == true;
        // if getLevel('business') == true;
        // if getLevel('godLike') == true;
}

// check if user owns profile


// Check is user is creator of document
function isOwner(createdBy) {
   return get(/databases/$(database)/documents/dashboard/{document}).data.createdBy[$(request.auth.uid)]
}