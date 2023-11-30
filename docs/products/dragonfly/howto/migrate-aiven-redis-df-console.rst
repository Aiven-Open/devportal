Migrate Aiven for Redis®* to Aiven for Dragonfly®
==============================================================

Transition Aiven for Redis®* databases seamlessly to Aiven for Dragonfly using the `Aiven Console <https://console.aiven.io/>`_. This guide provides detailed instructions for the migration process. 

The Aiven Console migration tool facilitates a smooth data transfer to Aiven for Dragonfly, enhancing scalability and performance for data infrastructure.

Prerequisites 
-------------------------------------------
Before starting the migration from an Aiven for Redis service:

* Confirm the Aiven for Redis service is accessible over the Internet. For more information, see :doc:`Public internet access </docs/platform/howto/public-access-in-vpc>`.
* Make sure to note the Aiven project and Aiven for Redis service names for migration in the Aiven Console.

The Aiven Console migration tool automatically uses connection details like the hostname, port, and credentials linked to the selected Aiven for Redis service.


Database migration steps
--------------------------

1. Log into `Aiven Console <https://console.aiven.io/>`_.
2. Navigate to **Service settings** from the sidebar.
3. Scroll to the **Service management** sectionand use the ellipsis to view additional menu options.
4. Select **Import database** to initiate the import process.



Step 1: Configure
'''''''''''''''''''
Begin the migration process by selecting **Import an Aiven for Redis service**:

1. From the drop-down menu, select your project name.
2. From the subsequent drop-down, select the Aiven for Redis database you intend to migrate.
3. Click **Get started** to proceed with the migration.


Step 2: Validation
''''''''''''''''''''''
The Aiven Console will automatically attempt to validate the database configurations for the selected Aiven for Redis service. Click **Run validation** to validate the connection. 

.. warning:: 

   If a validation error occurs during migration, follow the on-screen instructions to fix it. Rerun validation to ensure the database meets migration criteria. Note that the migration doesn't include service user accounts and commands in progress.


Step 3: Migration
''''''''''''''''''''
Once all the necessary checks have been completed successfully, you can proceed with the migration process.

* Click **Start migration** to initiate th data migration process to Aiven for Dragonfly.



Step 4: Replication
''''''''''''''''''''

While the migration is in progress:

* You can close the migration wizard by clicking **Close window** and return later to check the progress. You can keep track of the migration progress by checking the service overview page.
* To stop the migration, clicking **Stop migration**. This action will preserve the data already migrated to Aiven.

.. important::

 To prevent conflicts during replication:

* Avoid writing to tables in the target database that is currently undergoing migration.
* Do not manually change the replication settings of the source database.
* Refrain from making any changes that could interfere with the connection between the source and target databases, such as updating firewall rules or trusted sources.

.. note::

   If the migration fails, investigate, resolve, and restart the migration using **Start over**.



Step 5: Close and post-migration steps
'''''''''''''''''''''''''''''''''''''''''

Upon successful migration:

* **Stop replication**: If no further synchronization is required and you are ready to switch to Aiven for Dragonfly after thoroughly testing the service.

* **Keep replicating**: If ongoing data synchronization is necessary to maintain active synchronization.

.. warning::

   Avoid system updates or configuration changes during active replication to prevent unintentional migrations.


.. topic:: Replication mode active?
   
   Your data is now synchronized to Aiven for Dragonfly, with new writes to the source database being continuously synced.


Related reading
---------------

- :doc:`Aiven for Redis®* documentation </docs/products/redis/get-started>`
- Aiven for Dragonfly documentation 




