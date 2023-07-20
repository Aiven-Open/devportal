Use Prometheus with Aiven
=========================

Prometheus is an open-source systems monitoring and alerting toolkit. It
implements an in-memory and persistent storage model for metrics as well as
a query language for accessing the metrics.

The metrics delivery model of Prometheus is a pull model where the Prometheus
server connects to HTTP servers running on the nodes being monitored and pulls
the metrics from them. While this makes the service discovery more of an
challenge than using the more common push approach, it does have the benefit of
making the metrics available not just for Prometheus but for any app that can
read the Prometheus format from the HTTP server running on Aiven nodes.

Enable Prometheus support on your Aiven project
-----------------------------------------------

Aiven offers Prometheus endpoints for your services. To enable this feature,
follow the steps below:

#. | In the `Aiven console <https://console.aiven.io/>`_, select Projects at the top and select your project. 
#. | Select **Integration endpoints** from the left sidebar.

#. | Select **Prometheus** from the list available integration endpoints 
#. | Select **Add new endpoint** and enter the details for the endpoint. Select **Create**. 
 
   | Usually you only need one of these per project (as it can be used
     for all services in the same project) so if you can see one has
     already been created then you can skip this step.

#. | Next, navigate to the service that you would like to monitor and select **Manage integrations** from the service overview page. 

#. | In the **Integrations** screen, select **Prometheus**. 
#. | Select the endpoint name you created from the drop-down list and select **Enable**. At the top of the **Integrations** page, you will see the Prometheus integration listed and the status ``Active``. 

   .. image:: /images/platform/integrations/prometheus-endpoint-select.png
      :alt: Dialog box to select already configured Prometheus endpoints

#. | Select **Overview** from the left sidebar, and then select **Prometheus** tab within the **Connection information** section. 
     
#. | Copy the **Service URI** for the Prometheus connection information to log in to the browser and access the Prometheus dashboard.

   .. image:: /images/platform/integrations/prometheus-service-info.png
      :alt: Screenshot of Prometheus connection information in service overview page

Once configured, the system will initiate an HTTP server on all service nodes, granting access to the metrics. It is important to note that there might be a slight delay of approximately one minute before the metrics become available.

Accessing Prometheus in a VPC
''''''''''''''''''''''''''''''

If you use a VPC in your projects, then the property
``public_access.prometheus`` needs to be enabled in the **Advanced
Configuration** of the service whose metrics you want to access.

.. image:: /images/platform/integrations/prometheus-advanced-configurations.png
    :alt: Advanced configuration for accessing Prometheus in a VPC

Configure Prometheus
--------------------

Now that Aiven is exposing endpoints for your services, add a scrape
configuration to Prometheus for the servers you want to pull data from. The
examples in this section show how to configure for both single-node and
multiple-node services.

For services with a single node
'''''''''''''''''''''''''''''''

For single-node services, configure a ``scrape_config`` entry and the following settings:

* Basic auth details can be found on the **Prometheus** tab of the **Service Overview** page.

* The **Service URI** can also be found on the **Prometheus** tab of the **Service Overview** page.

* The location of the CA cert; the certificates are signed by the Aiven project CA so you will need to download it from the **Service Overview** page.

.. note::

    You can download the CA certificate using the 
    `Aiven command line client <https://github.com/aiven/aiven-client/>`_
    and the command ``avn project ca-get --target-filepath ca.pem``

Your ``scrape_config`` job entry in ``prometheus.yml`` would look something like this::

   scrape_configs:
     - job_name: aivenmetrics
       scheme: https
       basic_auth:
         username: <PROMETHEUS_USERNAME>
         password: <PROMETHEUS_PASSWORD>
       tls_config:
         ca_file: ca.pem
       static_configs:
         - targets: ["<PROMETHEUS_SERVICE_URI>:<PROMETHEUS_SERVICE_PORT"]

With the configuration in place, Prometheus will start pulling metrics from your services.


For services with multiple nodes
''''''''''''''''''''''''''''''''

For any services that consist of multiple nodes without a DNS name for each
node, use the ``dns_sd_configs`` option to define the servers with DNS type set
to ``A`` . This causes Prometheus to resolve all the IP addresses associated
with the DNS name and query all of those IP addresses directly. A side effect
of using this IP resolution is that Prometheus expects the TLS certificate to
be bound to the IP address of the hosts, not to the DNS name, so to make the
connection work you must enable the ``insecure_skip_verify`` setting. See the
below snippet for an example configuration.

::

   scrape_configs:
     - job_name: aivenmetrics
       scheme: https
       basic_auth:
         username: <PROMETHEUS_USERNAME>
         password: <PROMETHEUS_PASSWORD>
       dns_sd_configs:
         - names:
             - <PROMETHEUS_SERVICE_URI>
           type: A
           port: <PROMETHEUS_SERVICE_PORT>
       tls_config:
         insecure_skip_verify: true


.. note:: For PostgreSQL® services with multiple nodes, the primary DNS name does not include standby IP addresses. To track those, make sure to include the replica DNS names in the list.  If you have <PROMETHEUS_SERVICE_URI> as ``example.aivencloud.com``, then you will need to add ``replica-example.aivencloud.com``.


View full list of metrics
''''''''''''''''''''''''''

Aiven provides the Prometheus client via the Telegraf plugin so all the same
metrics that are available via the Aiven for InfluxDB® metrics integration are also
available via the Prometheus integration. You can see the full list of metrics :doc:`here </docs/integrations/prometheus-system-metrics>`.

.. note:: Note that for some services the metrics provided by different hosts may vary depending on the host role. Most notably for Kafka® only one of the nodes provides metrics related to consumer group offsets.

Other integrations
------------------

Here are some links to learn more about integrations with Aiven:

* :doc:`Aiven integrations </docs/platform/concepts/service-integration>`

* :doc:`Datadog integration </docs/integrations/datadog>`
