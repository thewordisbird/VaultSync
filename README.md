# VaultSync 
An Obsidian plugin to link your vault to a cloud provider. Currently only supporting dropbox. 

This plugin works on both desktop and mobile.

## Disclosures
This plugin interacts with dropbox via the [dropbox javascript sdk](https://github.com/dropbox/dropbox-sdk-js).
Files from your connected provider account in the selected remote vault folder will be brought into you obsidian vault and will be editable and deletable.
Files from your obsidian vault will be synced (copied) to your remote vault on your cloud provider

## Getting Started
Install the plugin from [Obsidian Community Plugin](https://obsidian.md/plugins) or from within the Obsidian App.

Toggle the switch (A) to enable the plugin. You'll see the plugin name listed on the sidebar (B)
<img width="1117" alt="Screenshot 2025-02-01 at 11 59 07 AM" src="https://github.com/user-attachments/assets/255c707b-ccc9-4c33-8533-2e40564d871a" />

Follow the plugin link on the sidebar (B) to view the plugin settings page
<img width="1114" alt="Screenshot 2025-02-01 at 12 12 05 PM" src="https://github.com/user-attachments/assets/343a98cf-97a6-487b-a1a8-d5540c422ef9" />

### Connecting to a provider
Currently only dropbox is supported, but as more providers are added, the process will remain the sam.

Select a provider and click "Connect" to follow the authentication flow. Once completed you'll see the VaultSync options for connected users
<img width="1114" alt="Screenshot 2025-02-01 at 12 15 08 PM" src="https://github.com/user-attachments/assets/7761fcf0-72c4-488f-9528-a27013d86487" />

### Selecting Your Provider Vault Path
This is the remote folder that your local vault will be synced to.

In the "Dropbox vault path" click "Select vault" to select an existing provider hosted directory or create a new directory by clicking "Add folder" in the "Select vault" modal

After selecting a vault you should see the vault appear in the input field.
<img width="1110" alt="Screenshot 2025-02-01 at 12 21 04 PM" src="https://github.com/user-attachments/assets/236b0fb6-77c5-4272-92c4-d6b2b25ec5b0" />

Congratulations! You've connected your vault to your provider. 

## Sync Protocol
NOTE: Provider in the below context refers to the remote cloud provider
### New Remote Vault Selection
When a new vault is selected the following rules are applied to the sync:
- Provider and client files with the same name and content hash are untouched
- Provider and client files with the same name but different content hashes sync the file with the most recent modification timestamp
- Provider files that do not exist on the client are downloaded and added to the client
- Client files that do not exist on the provider are uploaded to the provider


