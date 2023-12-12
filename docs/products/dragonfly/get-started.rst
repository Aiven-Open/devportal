Get started with Aiven for Dragonfly®
=======================================

The first step in using Aiven for Dragonfly is to create a service. You can do so either using the `Aiven Console <https://console.aiven.io/>`_ or the `Aiven CLI <https://github.com/aiven/aiven-client>`_.

.. important:: 
    Aiven for Dragonfly® is currently a :doc:`limited availability </docs/platform/concepts/beta_services>` service. If you are interested in exploring this offering, reach out to our sales team at sales@Aiven.io for more information and access.

Create a service using the Aiven Console
----------------------------------------------
1. Log in to the `Aiven Console <https://console.aiven.io/>`_.

2. Follow :doc:`these instructions </docs/platform/howto/create_new_service>` to create a new Dragonfly service.

Once the service is ready, the status changes to *Running*. Depending on your selected cloud provider and region, this generally takes a couple of minutes.


Create a service using the Aiven CLI
------------------------------------------------

`Aiven CLI <https://github.com/aiven/aiven-client>`_ provides a simple and efficient way to create an Aiven for Dragonfly® service. If you prefer launching a new service from the CLI, follow these steps:

1. Determine the service plan, cloud provider, and region you want to use for your Dragonfly service.
2. Run the following command to create Dragonfly service named dragonfly-demo:

.. code:: 

    avn service create dragonfly-demo   \
        --service-type dragonfly                 \
        --cloud google-europe-north1             \
        --plan startup-4                         \
        --project dev-sandbox

.. note::
    There are additional options available to you, which you can view by running the following commands:

    * For a full list of default flags: ``avn service create -h``
    * For type-specific options: ``avn service types -v`` 


Connect to Aiven for Dragonfly
-------------------------------

Learn how to connect to Aiven for Dragonfly using different programming languages:

* :doc:`redis-cli </docs/products/dragonfly/howto/connect-redis-cli>`
* :doc:`Go </docs/products/dragonfly/howto/connect-go>`
* :doc:`Node </docs/products/dragonfly/howto/connect-node>`
* :doc:`Python </docs/products/dragonfly/howto/connect-python>`


Explore other resources 
------------------------

* Learn about how Aiven for Dragonfly supports :doc:`high availability </docs/products/dragonfly/concepts/ha-dragonfly>`.
* Migrate data from :doc:`Aiven for Redis®* to Aiven for Dragonfly </docs/products/dragonfly/howto/migrate-aiven-redis-df-console>`.
* Migrate data from :doc:`external Dragonfly to Aiven for Dragonfly </docs/products/dragonfly/howto/migrate-ext-redis-df-console>`.


