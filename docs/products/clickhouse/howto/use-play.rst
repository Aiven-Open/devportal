Use ClickHouse® play UI
========================

ClickHouse includes a built-in user interface for running SQL queries. You can access it from a web browser over the HTTPS protocol. Follow these steps to use it:

1. Log in to the `Aiven web console <https://console.aiven.io/>`_, choose the right project, and select your Aiven for ClickHouse service.
#. In the *Overview* tab, find *Connection information* and select **ClickHouse HTTPS**.
#. Copy the Service URI and navigate to ``SERVICE_URI/play`` from a web browser.
#. Set the *name* and the *password* of the user on whose behalf you want to run the queries.
#. Enter the body of the query.
#. Click **Run**.

.. note::
    `/play` is an alternative to the :doc:`query editor <use-query-editor>`. The query editor can be accessed directly from the console to run requests on behalf of the default user.